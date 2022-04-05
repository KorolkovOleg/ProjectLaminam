package com.example.projectlaminam.config;

import com.example.projectlaminam.security.Permission;
import com.example.projectlaminam.security.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.GET, "/packages/").hasAuthority(Permission.CARDS_READ.getPermission())
                .antMatchers(HttpMethod.GET, "/packages/**").hasAuthority(Permission.CARDS_READ.getPermission())
                .antMatchers(HttpMethod.POST, "/packages/").hasAuthority(Permission.CARDS_WRITE.getPermission())
                .antMatchers(HttpMethod.PUT, "/packages/**").hasAuthority(Permission.CARDS_WRITE.getPermission())
                .antMatchers(HttpMethod.DELETE, "/packages/**").hasAuthority(Permission.CARDS_WRITE.getPermission())
                .antMatchers(HttpMethod.GET, "/packages/**/cards").hasAuthority(Permission.CARDS_READ.getPermission())
                .antMatchers(HttpMethod.POST, "/packages/**/cards").hasAuthority(Permission.CARDS_WRITE.getPermission())
                .antMatchers(HttpMethod.PUT, "/packages/**/cards/**").hasAuthority(Permission.CARDS_WRITE.getPermission())
                .antMatchers(HttpMethod.DELETE, "/packages/**/cards/**").hasAuthority(Permission.CARDS_WRITE.getPermission())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    @Bean
    @Override
    protected UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(
                User.builder()
                        .username("admin")
                        .password(passwordEncoder().encode("admin"))
                        .authorities(Role.ADMIN.getAuthorities())
                        .build()
        );
    }

    @Bean
    protected PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
