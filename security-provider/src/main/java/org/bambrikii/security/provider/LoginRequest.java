package org.bambrikii.security.provider;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
//    @NotBlank
//    @Email
    private String email;
//    @NotBlank
    private String password;
}
