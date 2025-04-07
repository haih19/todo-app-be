export class RegexConstant {
  static readonly USERNAME: RegExp = /^\w+$/;
  static readonly PASSWORD: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
}
