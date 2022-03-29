package com.example.projectlaminam.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/**").permitAll()
                .antMatchers("/packages/**").permitAll()
                .antMatchers(HttpMethod.POST, "/packages/").permitAll()
                .antMatchers(HttpMethod.PUT, "/packages/").permitAll()
                .antMatchers(HttpMethod.DELETE, "/packages/**").permitAll()
                .antMatchers("/packages/**/cards").permitAll();

    }
}
