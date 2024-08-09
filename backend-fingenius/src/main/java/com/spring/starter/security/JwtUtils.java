package com.spring.starter.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import com.spring.starter.model.entity.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.spring.starter.service.UserService;

@Component
public class JwtUtils {
  
  @Value("${jwt.secret}")
  private String jwtSecret;

  @Value("${jwt.secretRefresh}")
  private String jwtSecretRefresh;

  @Value("${jwt.appName}")
  private String appName;

  @Value("${jwt.jwtExpiration}")
  private long jwtExpiration;

  @Value("${jwt.jwtExpirationRefresh}")
  private long jwtExpirationRefresh;

  @Autowired
  private UserService userService;

  public String generatedAccessToken(AppUser appUser) {
    return this.generateToken(appUser, this.getAlgorithm(), this.jwtExpiration);
  }

  public String generatedRefreshToken(AppUser appUser) {
    return this.generateToken(appUser, this.getAlgorithmRefreshToken(), this.jwtExpirationRefresh);
  }

  public String getIdUserByAccessToken(String token) {
    return this.decodedJWT(this.getAlgorithm(), token).getSubject();
  }

  public String getIdUserByRefreshToken(String token) {
    return this.decodedJWT(this.getAlgorithmRefreshToken(), token).getSubject();
  }

  public boolean verifyJwtToken(String token) {
    return this.decodedJWT(this.getAlgorithm(), token).getIssuer().equals(this.appName);
  }

  public String refreshAccessToken(String refreshToken) {
    AppUser appUser = this.userService.loadUserByUserId(this.getIdUserByRefreshToken(refreshToken));
    return this.generatedAccessToken(appUser);
  }

  public Map<String, String> getUserInfoByToken(String token) {
    try {
      DecodedJWT decodedJWT = this.decodedJWT(this.getAlgorithm(), token);

      Map<String, String> userInfo= new HashMap<>();
      userInfo.put("userId", decodedJWT.getSubject());

      return userInfo;
    } catch (Exception e) {
      throw new RuntimeException();
    }
  }

  private String generateToken(AppUser appUser, Algorithm algorithm, long jwtExpirationTime) {
    return JWT.create()
    .withIssuer(appName)
    .withSubject(appUser.getId())
    .withExpiresAt(Instant.now().plusSeconds(jwtExpirationTime))
    .withIssuedAt(Instant.now())
    .sign(algorithm);
  }

  private DecodedJWT decodedJWT(Algorithm algorithm, String token) {
    JWTVerifier verifier = JWT.require(algorithm).build();
    return verifier.verify(token);
  }

  private Algorithm getAlgorithm () {
    return Algorithm.HMAC256(this.jwtSecret.getBytes(StandardCharsets.UTF_8));
  }

  private Algorithm getAlgorithmRefreshToken () {
    return Algorithm.HMAC256(this.jwtSecretRefresh.getBytes(StandardCharsets.UTF_8));
  }

}
