declare type USER_TYPES = "Admin" | "User";

declare interface LoginUserI {
  email: string;
  password: string;
}

declare interface RegisterUserI extends LoginUserI {
  firstName: string;
  lastName: string;
}

declare interface BasicUserI extends RegisterUserI {
  phone?: string;
  avatar?: string;
  role: USER_TYPES;
  isActive?: boolean;
  borrowLimit?: number;
  fines?: number;
  books: {
    borrowed: string[];
    read: string[];
    favorites: string[];
  };
}
declare interface UserI extends Omit<BasicUserI, "password"> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  stats?: {
    totalBorrowedBooks: number;
    totalReadBooks: number;
    totalFavorites: number;
  };
}
