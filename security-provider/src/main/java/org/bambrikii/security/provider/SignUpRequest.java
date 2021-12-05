package org.bambrikii.security.provider;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
    //    @NotBlank
    private String name;
    //    @NotBlank
//    @Email
    private String email;
    //    @NotBlank
    private String password;
}
