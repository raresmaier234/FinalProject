package com.example.backend;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for testing purposes
                .authorizeRequests()
                .dispatcherTypeMatchers(HttpMethod.valueOf("/public/**")).permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().and()
                .httpBasic();
        return http.build();
    }
}
