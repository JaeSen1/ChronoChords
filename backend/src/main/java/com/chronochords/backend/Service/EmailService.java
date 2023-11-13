package com.chronochords.backend.Service;

import com.chronochords.backend.Entity.User;

public interface EmailService {
    void sendPasswordResetEmail(User user, String token);
}
