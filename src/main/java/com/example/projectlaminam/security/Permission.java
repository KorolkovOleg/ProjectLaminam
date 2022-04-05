package com.example.projectlaminam.security;

public enum Permission {
    CARDS_READ("cards:read"),
    CARDS_WRITE("cards:write");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
