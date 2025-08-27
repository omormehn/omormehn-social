  export const cleanErrorMessage = (error: Error) => {
    const message = error.message;

    // if (message.includes('Invalid `password` param:')) {
    //   return 'Password must be between 8 and 256 characters long.';
    // }

    // if (message.includes('Invalid `email` param:')) {
    //   return 'Please enter a valid email address.';
    // }

    return message;
  };
