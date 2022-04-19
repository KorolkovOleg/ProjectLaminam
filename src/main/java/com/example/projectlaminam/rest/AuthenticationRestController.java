package com.example.projectlaminam.rest;


import com.example.projectlaminam.domain.User;
import com.example.projectlaminam.repositories.UserRepository;
import com.example.projectlaminam.security.JwtTokenProvider;
import com.example.projectlaminam.security.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private JwtTokenProvider jwtTokenProvider;
    private PasswordEncoder passwordEncoder;

    @Value("${jwt.header}")
    private String authorizationHeader;

    public AuthenticationRestController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;


    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequestDTO request, HttpServletResponse response) {

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            String token = jwtTokenProvider.createToken(request.getUsername(), Role.USER.name());
            Map<Object, Object> responseBody = new HashMap<>();
            responseBody.put("username", request.getUsername());
            responseBody.put("token", token);

            Cookie tokenCookie = new Cookie("Authorisation", token);
            tokenCookie.setPath("/");
            tokenCookie.setHttpOnly(true);
            response.addCookie(tokenCookie);

            Cookie isAuthorisedCookie = new Cookie("isAuthorised", "true");
            isAuthorisedCookie.setPath("/");
            isAuthorisedCookie.setHttpOnly(false);
            response.addCookie(isAuthorisedCookie);
            response.setContentType("text/plain");

            return ResponseEntity.ok(responseBody);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Invalid username or login", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();
        securityContextLogoutHandler.logout(request, response, null);

        Cookie tokenCookie = new Cookie("Authorisation", null);
        tokenCookie.setPath("/");
        tokenCookie.setHttpOnly(true);
        tokenCookie.setMaxAge(0);
        response.addCookie(tokenCookie);

        Cookie isAuthorisedCookie = new Cookie("isAuthorised", null);
        isAuthorisedCookie.setPath("/");
        isAuthorisedCookie.setHttpOnly(false);
        isAuthorisedCookie.setMaxAge(0);
        response.addCookie(isAuthorisedCookie);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) {
        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
            return new ResponseEntity("Username already exist", HttpStatus.CONFLICT);
        }

        user.setPassword(new BCryptPasswordEncoder(12).encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }
}
