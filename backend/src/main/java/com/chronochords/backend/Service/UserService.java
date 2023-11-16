package com.chronochords.backend.Service;
import java.util.List;

import com.chronochords.backend.DTO.ProfileDTO;
import com.chronochords.backend.DTO.UserDTO;
import com.chronochords.backend.DTO.LoginDTO;
import com.chronochords.backend.Entity.User;
import com.chronochords.backend.payload.response.LoginMessage;
public interface UserService {
    String addUser(UserDTO userDTO);
    LoginMessage loginUser(LoginDTO loginDTO);

    void createPasswordResetTokenForUser(User user, String token);

    void changeUserPassword(User user, String newPassword);

    User getUserByPasswordResetToken(String token);

    boolean isResetTokenValid(String token);
    static List<User> getAllUsers() {
        return null;
    }
    ProfileDTO getUserProfile(Long userId);
    void updateUserProfile(Long userId, ProfileDTO profileDTO);
}
