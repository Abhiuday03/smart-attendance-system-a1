package com.facetrack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        // 1. Allow  frontend
//        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        corsConfig.setAllowedOrigins(Arrays.asList("*"));
        
        // 2. Allow all standard HTTP methods, including OPTIONS (Crucial for CORS pre-flight)
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 3. Allow all headers (like Authorization for your JWT token)
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        
        // 4. Cache the CORS response so the browser doesn't ask every single time
        corsConfig.setMaxAge(3600L);

        // Apply this configuration to ALL routes (/**)
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}