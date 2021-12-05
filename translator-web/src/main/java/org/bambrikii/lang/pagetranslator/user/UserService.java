package org.bambrikii.lang.pagetranslator.user;

import org.bambrikii.security.orm.User;
import org.bambrikii.security.orm.UserRepository;
import org.bambrikii.security.provider.BadRequestException;
import org.bambrikii.security.provider.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User retrieveUser(UserPrincipal userPrincipal) {
        Optional<User> userOptional = userRepository.findById(userPrincipal.getId());
        if (userOptional.isEmpty()) {
            throw new BadRequestException("User required.");
        }
        return userOptional.get();
    }

    public void validateUserIsSame(UserPrincipal userPrincipal, User createdBy) {
        User user = retrieveUser(userPrincipal);
        if (!user.equals(createdBy)) {
            throw new BadRequestException("User is not authorized to delete other's articles.");
        }
    }
}
