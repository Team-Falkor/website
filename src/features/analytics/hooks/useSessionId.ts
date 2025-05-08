import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SESSION_ID_KEY = "falkor-session-id";

export const useSessionId = (): string => {
	const [sessionId, setSessionId] = useState<string>("");

	useEffect(() => {
		let storedSessionId = localStorage.getItem(SESSION_ID_KEY);

		if (!storedSessionId) {
			storedSessionId = uuidv4();
			localStorage.setItem(SESSION_ID_KEY, storedSessionId);
		}

		setSessionId(storedSessionId);
	}, []);

	return sessionId;
};
