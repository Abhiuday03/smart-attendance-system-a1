package com.facetrack.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ForgotPasswordRequest(
		@NotBlank(message = "Institute email is required")
	    @Email(message = "Invalid institute email format")
	    @Size(max = 100, message = "Institute email cannot exceed 100 characters")
	    String email
		) {

}
