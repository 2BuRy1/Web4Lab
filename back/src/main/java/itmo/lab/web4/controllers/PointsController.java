package itmo.lab.web4.controllers;


import itmo.lab.web4.models.Point;
import itmo.lab.web4.models.User;
import itmo.lab.web4.repositories.PointRepository;
import itmo.lab.web4.repositories.UserRepository;
import itmo.lab.web4.services.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Slf4j
@RestController
public class PointsController {

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    PointRepository pointRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    Logger logger;

    @GetMapping("/points")
    public ResponseEntity<Map<String, ArrayList<Point>>> rofl(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
    String jwt = token.substring(7);
    String username = jwtUtil.extractUsername(jwt);

    User user = userRepository.findByUsername(username).get();

    ArrayList<Point> points = (ArrayList<Point>) pointRepository.findAllByUser_Id(user.getId());


    Map<String, ArrayList<Point>> map = new HashMap<>();
    map.put("points", points);

    return ResponseEntity.ok(map);

    }

    @PostMapping("/addPoint")
    public ResponseEntity<String> addPoint(@RequestBody Point point, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        logger.info(point.toString());

        String jwt = token.substring(7);


        String username = jwtUtil.extractUsername(jwt);


        var user = userRepository.findByUsername(username);

        
        point.setUser(user.get());


        pointRepository.save(point);

        return ResponseEntity.ok("Point Added");
    }


}
