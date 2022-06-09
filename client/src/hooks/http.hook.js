import { useCallback, useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    const request = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setLoading(true);
            try {
                const payload = JSON.parse(localStorage.getItem("userData"));

                if (payload) {
                    headers["Authorization"] = "Bearer " + payload.token;
                }
                if (body) {
                    body = JSON.stringify(body);
                    headers["Content-Type"] = "application/json";
                }

                const response = await fetch(SERVER_URL + url, {
                    method,
                    body,
                    headers,
                });

                const data = await response.json();

                if (!response.ok) {
                    setServerError(data.message);
                }

                setLoading(false);

                return data;
            } catch (err) {
                setLoading(false);
                setServerError(err.message);
                throw err;
            }
        },
        [],
    );

    const clearError = useCallback(() => setServerError(null), []);

    return { loading, request, serverError, clearError };
};
