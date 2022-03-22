package com.project.MTmess.Exception;

public class InvalidPasswordException extends Exception{

    public InvalidPasswordException(String errMsg){
        super(errMsg);
    }
}
