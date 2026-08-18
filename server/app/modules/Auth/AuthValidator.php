<?php

namespace App\Modules\Auth;
use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;
use App\Shared\Exception\UnprocessableEntityException;

class AuthValidator
{
    public function validateRegister($dto)
    {
        try {
            v::key('firstName',
            v::stringType()
                ->notEmpty()
                ->length(2, 50)
            )
            ->key('lastName',
                v::stringType()
                    ->notEmpty()
                    ->length(2, 50)
            )
            ->key('email',
                v::email()
                    ->notEmpty()
            )
            ->key('password',
                v::stringType()
                    ->notEmpty()
                    ->length(8, null)
            )
            ->key('confirmPassword',
                v::stringType()
                    ->notEmpty()
            )
            ->key('termsAccepted',
                v::boolType()->trueVal()
            )
            ->assert([
                'firstName' => $dto->firstName,
                'lastName' => $dto->lastName,
                'password' => $dto->password,
                'confirmPassword' => $dto->confirmPassword,
                'termsAccepted' => $dto->termsAccepted,
                'email' => $dto->email
            ]);
        } catch (NestedValidationException $e) {
            throw new UnprocessableEntityException();
        }
    }
}