package itmo.lab.web4.services;


import itmo.lab.web4.models.Point;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class Validator {


    public boolean validate(Point point) throws BadRequestException {

        return (validateX(point) && validateY(point) && validateR(point) && isNumber(point));

    }


    private boolean validateX(Point point) {
        return (-2 <= point.getX() && point.getX() <= 2);
    }


    private boolean validateY(Point point) {
        return (point.getY() >= -5 && point.getY() <= 3);
    }

    private boolean validateR(Point point) {
        double[] arrayOfR = new double[]{-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2};
        for (double element : arrayOfR) {
            if (point.getR() == element) return true;
        }
        return false;
    }

    private boolean isNumber(Point point) throws BadRequestException {
        try{
            double x = Double.parseDouble(String.valueOf(point.getX()));
            double y = Double.parseDouble(String.valueOf(point.getY()));
            double r = Double.parseDouble(String.valueOf(point.getR()));
            return true;
        }
        catch (NumberFormatException e) {
            throw new BadRequestException();
        }

    }


}
