package org.bambrikii.lang.pagetranslator.oauth2.authorizationserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
public class DefaultSecurityConfig {

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().authenticated()
                )
                .formLogin(withDefaults());
        return http.build();
    }

    // ...

    @Bean
    public UserDetailsService users() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("password")
                .roles(
                        "articles-client-authorization-code",
                        "authorization_code",
                        "articles.read"
                )
                .authorities(
                        "articles-client-authorization-code",
                        "authorization_code",
                        "articles.read"
                )
                .build();
        UserDetails user2 = User.withDefaultPasswordEncoder()
                .username("articles-client")
                .password("secret")
                .roles(
//                        "articles-client-authorization-code",
                        "authorization_code"
//                        "articles.read"
                )
                .authorities(
//                        "articles-client-authorization-code",
                        "authorization_code"
//                        "articles.read"
                )
                .build();
        return new InMemoryUserDetailsManager(user, user2);
    }
}
