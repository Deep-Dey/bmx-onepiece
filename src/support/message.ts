export class Message {

	public static readonly NO_ACTION: string = '';
	public static readonly FETCH_FAILURE: string = 'Failed to fetch results.';
	public static readonly IO_FAILURE: string = 'An I/O failure was encountered.';
	public static readonly SERVLET_FAILURE: string = 'A servlet failed while trying to process your request.';
	public static readonly EXPIRED_CREDENTIALS: string = 'The credentials used have expired.';
	public static readonly ILLEGAL_ARGUMENTS: string = 'Illegal credentials were used to authenticate.';
	public static readonly BAD_CREDENTIALS: string = 'The credentials provided were incorrect.';
	public static readonly ACCOUNT_DISABLED: string = 'The associated account is disabled and not accessible.';
	public static readonly AUTH_INFO_UNAVAILABLE: string = 'No associated account was found. Bad credentials, maybe.';
	public static readonly INTERNAL_AUTHENTICATION_SERVICE_FAILURE: string = 'Our system failed to authenticate the credentials.';
	public static readonly MALFORMED_CREDENTIALS: string = 'The credentials have been tampered with.';
	public static readonly USERNAME_NOT_FOUND: string = 'The username does not have any associated account.';
	public static readonly USER_ACCOUNT_LOCKED: string = 'The user account may be locked. Contact systems administrator.';
	public static readonly INCOMPLETE_INFORMATION: string = 'Complete information was not provided.';
	public static readonly MALFORMED_INFORMATION: string = 'The information provided is malformed and cannot be accepted.';
	public static readonly UNHANDLED_EXCEPTION: string = 'The system detected an unknown error.';
	public static readonly EXCEPTION_READING_REQUEST: string = 'An exception occurred while trying to read the request dump contents.';
	public static readonly GENERIC_ERROR: string = 'An error occurred.';
	public static readonly EMAIL_ENCODER_ERROR: string = 'An error occurred while trying to encrypt or decrypt an email address';
	public static readonly PASSWORD_ENCODER_ERROR: string = 'An error occurred while trying to encrypt or decrypt a password';
	public static readonly AUTHORIZATION_DENIED: string = 'Authorization has been denied.';
	public static readonly INVALID_REQUEST: string = 'This request is invalid.';
	public static readonly INSERT_SUCCESS: string = 'The request is successfully added to database.';
	public static readonly UPDATE_SUCCESS: string = 'The request is successfully updated to database.';
	public static readonly DELETE_SUCCESS: string = 'The request is successfully deleted from database.';
	public static readonly INSERT_FAILURE: string = 'The request failed to add to database.';
	public static readonly NOT_UNIQUE: string = 'The request is not unique.';
	public static readonly UPDATE_FAILURE: string = 'The request failed to update the database.';
	public static readonly PARTIAL_UPDATE_FAILURE: string = 'Some instances failed to update the database while others were successful.';
	public static readonly INCORRECT_INFORMATION: string = 'The request contains incorrect information.';
	public static readonly DELETE_FAILURE: string = 'The request failed to delete from database.';
}
