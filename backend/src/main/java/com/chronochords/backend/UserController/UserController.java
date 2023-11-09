package com.chronochords.backend.UserController;
import com.chronochords.backend.DTO.UserDTO;
import com.chronochords.backend.DTO.LoginDTO;
import com.chronochords.backend.Service.UserService;
import com.chronochords.backend.payload.response.LoginMessage;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping(path = "/save")
    public String saveUser(@Valid @RequestBody UserDTO userDTO)
    {
        String id = userService.addUser(userDTO);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginMessage loginMessage = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginMessage);
    }
}
