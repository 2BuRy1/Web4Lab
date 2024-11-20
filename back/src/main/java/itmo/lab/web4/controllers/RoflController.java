package itmo.lab.web4.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class RoflController {


    @GetMapping("/rofl")
    public ResponseEntity<String> rofl() {
        Map<String, String> map = new HashMap<>();
        map.put("name", "rofl");
        return ResponseEntity.ok(map.toString());
    }



}
