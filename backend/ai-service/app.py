from pathlib import Path
from fastapi import File, UploadFile
import modal
import os
from typing import Optional

image = (
    modal.Image.debian_slim()
    .pip_install_from_requirements("requirements.txt")
    .add_local_dir(".", remote_path="/root",copy=False) # copy=True for Force Build
)

app = modal.App(
    name="smart-attendance-ai",
    image=image,
)

Volume=modal.Volume.from_name("uploaded-images")
MODEL_DIR = "/images"

Secrets=modal.Secret.from_name("facetrack-secrets")


# To RUN => modal run app.py::debug
@app.function(volumes={MODEL_DIR: Volume},
                secrets=[Secrets]
            )
def debug():
    print("PWD:", os.getcwd())
    print("FILES:", os.listdir("."))


@app.function(volumes={MODEL_DIR: Volume},
                secrets=[Secrets])
@modal.asgi_app()
def fastapi_app():
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from routers.health import router as health_router
    from datetime import datetime
    import cv2
    import numpy as np
    
    secret_key = os.environ["test"]
    # print("Secret Key:", secret_key)
    
    app = FastAPI(
        title="User Authentication API",
        description="API for user authentication and session management",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS
    origins = [
        "http://localhost:5176",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*", "Set-Cookie", "set-cookie"],
    )

    # Including routers
    app.include_router(health_router)

    @app.get("/")
    def root():
        return {
            "message": "Smart Attendance AI Service",
            "status": "running"
        }
    
    @app.post("/test-upload")
    async def test_upload(file: UploadFile = File(...)):
        print("Received file:", file.filename)
        print("Content type:", file.content_type)
        
        contents = await file.read()

        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return {"error": "Invalid image"}

        output_path = os.path.join(
                            MODEL_DIR,
                            file.filename or f"{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
                            )
        cv2.imwrite(output_path, img)

        return {"message": "Image saved", "path": output_path}
    return app