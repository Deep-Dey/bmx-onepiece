export class LogMessage {

	public static readonly UNAUTH_AUTH_TOKEN_REQUEST: string = LogMessage.buildUnAuthAccessLog('authority token');
	public static readonly UNAUTH_PROFILE_REQUEST: string = LogMessage.buildUnAuthAccessLog('profile');

	private constructor() {
	}

	private static buildUnAuthAccessLog(keyword: string): string {
		return 'Unauthorized request to access ' + keyword + ': detected and blocked';
	}
}
