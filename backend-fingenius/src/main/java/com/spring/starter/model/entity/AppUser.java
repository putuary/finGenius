package com.spring.starter.model.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.spring.starter.utils.constant.ERole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AppUser implements UserDetails {

  private String id;
  private String email;
  private String password;
  private ERole role;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    
    List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();

    simpleGrantedAuthorities.add(new SimpleGrantedAuthority(this.role.name()));

    return simpleGrantedAuthorities;
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
