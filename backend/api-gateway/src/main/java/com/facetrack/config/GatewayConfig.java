package com.facetrack.config;

//import com.example.demo.filter.AuthenticationFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

//    @Autowired
//    private AuthenticationFilter authFilter;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Route 1: Auth Service (No Filter)
                .route("auth-service", r -> r
                        .path("/auth/**")
                        .uri("lb://AUTH-SERVICE"))

           
//                .route("service-a", r -> r
//                        .path("/api/v1/data/**")
////                        .filters(f -> f.filter(authFilter.apply(new AuthenticationFilter.Config())))
//                        .uri("lb://SERVICEA"))
                .build();
    }
}