package com.spring.starter.security;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.starter.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserService userService;

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain
  )
    throws ServletException, IOException {
    
    try {
      String headerAuth = request.getHeader(HttpHeaders.AUTHORIZATION);
      String token = null;

      if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
        token = headerAuth.substring(7);
      }

      if (token != null && this.jwtUtils.verifyJwtToken(token)) {
        Map<String, String> userInfo = this.jwtUtils.getUserInfoByToken(token);
        UserDetails user = this.userService.loadUserByUserId(userInfo.get("userId"));

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        
        authenticationToken.setDetails(new WebAuthenticationDetailsSource());
        
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      }
      
    } catch (Exception e) {
      logger.error("Cannot set user authentication: {}", e);
    }

    filterChain.doFilter(request, response);
      
  }
  
}
