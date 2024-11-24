package itmo.lab.web4.services;

import itmo.lab.web4.models.User;
import itmo.lab.web4.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Slf4j
@Service
public class AuthService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    Logger logger;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;


    public String register(User newUser) {

        User user = new User();
        user.setUsername(newUser.getUsername());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setRole(User.Roles.USER);

        userRepository.save(user);

        logger.info("Username: " + newUser.getUsername());
        logger.info("Password: " + passwordEncoder.encode(newUser.getPassword()));

        org.springframework.security.core.userdetails.User securityUser =
                (org.springframework.security.core.userdetails.User) org.springframework.security.core.userdetails.User.builder()
                        .username(user.getUsername())
                        .password(user.getPassword())
                        .roles(String.valueOf(User.Roles.USER))
                        .build();

        return jwtUtil.generateToken(securityUser.getUsername());
    }

    public String login(User presentUser) throws UsernameNotFoundException {
        authenticationManager.
                authenticate(new UsernamePasswordAuthenticationToken(presentUser.getUsername(),
                       presentUser.getPassword()));
        logger.info("Username: " + presentUser.getUsername());
        logger.info("Password: " + presentUser.getPassword());

        User user = userRepository.findByUsername(presentUser.getUsername()).orElseThrow(() -> new UsernameNotFoundException("UserNotFound"));

        return jwtUtil.generateToken(user.getUsername());
    }



}
