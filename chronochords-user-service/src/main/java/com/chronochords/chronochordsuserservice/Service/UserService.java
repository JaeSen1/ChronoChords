package com.chronochords.chronochordsuserservice.Service;

import com.chronochords.chronochordsuserservice.DTO.UserDTO;
import com.chronochords.chronochordsuserservice.DTO.LoginDTO;
import com.chronochords.chronochordsuserservice.payload.response.LoginMessage;
public interface UserService {
    String addUser(UserDTO userDTO);
    LoginMessage loginUser(LoginDTO loginDTO);
}
