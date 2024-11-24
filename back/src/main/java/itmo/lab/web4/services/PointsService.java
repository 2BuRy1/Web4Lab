package itmo.lab.web4.services;

import itmo.lab.web4.models.Point;
import itmo.lab.web4.models.User;
import itmo.lab.web4.repositories.PointRepository;
import itmo.lab.web4.repositories.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PointsService {

    @Autowired
    private Validator validator;

    @Autowired
    private AreaChecker areaChecker;

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;




    public Point checkHit(Point point, String username) throws BadRequestException {


        if(!validator.validate(point)) throw new BadRequestException();

        User user = userRepository.findByUsername(username).get();

        point.setUser(user);

        point.setStatus(areaChecker.isInTheSpot(point));

        pointRepository.save(point);

        return point;

    }


}
