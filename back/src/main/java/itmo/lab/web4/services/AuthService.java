package itmo.lab.web4.services;

import itmo.lab.web4.models.User;
import itmo.lab.web4.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;


    public String register(User newUser) {
        var user = org.springframework.security.core.userdetails.User.builder()
                .username(newUser.getUsername())
                .password(newUser.getPassword())
                .roles(String.valueOf(User.Roles.USER))
                .build();
        userRepository.save(newUser);

        return jwtUtil.generateToken(user.getUsername());


    }

    public String login(User presentUser){
        authenticationManager.
                authenticate(new UsernamePasswordAuthenticationToken(presentUser.getUsername(),
                        presentUser.getPassword()));

        User user = userRepository.findByUsername(presentUser.getUsername()).orElseThrow();

        return jwtUtil.generateToken(user.getUsername());
    }



}
