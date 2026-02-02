
# 插件無法正確推導出類型
打包的插件提供給client使用無法正確推導出類型

``` ts

/*
checkEmailClient的ts推導:
(alias) const checkEmailClient: () => {
    id: "check-email-client";
    $InferServerPlugin: BetterAuthPlugin;
    pathMethods: {
        "/check-email": "POST";
    };
}

emailCooldownClient的ts推導:
(alias) const emailCooldownClient: () => {
    id: "email-cooldown-client";
    $InferServerPlugin: BetterAuthPlugin;
    pathMethods: {
        "/email-cooldown": "POST";
    };
}

*/
import { checkEmailClient, emailCooldownClient } from '@holon/auth-plugins/client'

/* 正確的ts推導 better-auth官方插件
(alias) const emailOTPClient: () => {
    id: "email-otp";
    $InferServerPlugin: {
        id: "email-otp";
        init(ctx: AuthContext): {
            options: {
                emailVerification: {
                    sendVerificationEmail(data: {
                        user: User;
                        url: string;
                        token: string;
                    }, request: Request | undefined): Promise<void>;
                };
            };
        } | undefined;
        endpoints: {
            sendVerificationOTP: StrictEndpoint<"/email-otp/send-verification-otp", {
                method: "POST";
                body: ZodObject<{
                    email: ZodString;
                    type: ZodEnum<{
                        "sign-in": "sign-in";
                        "email-verification": "email-verification";
                        "forget-password": "forget-password";
                    }>;
                }, $strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                success: boolean;
            }>;
            createVerificationOTP: StrictEndpoint<string, {
                method: "POST";
                body: ZodObject<{
                    email: ZodString;
                    type: ZodEnum<{
                        "sign-in": "sign-in";
                        "email-verification": "email-verification";
                        "forget-password": "forget-password";
                    }>;
                }, $strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "string";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, string>;
            getVerificationOTP: StrictEndpoint<string, {
                method: "GET";
                query: ZodObject<{
                    email: ZodString;
                    type: ZodEnum<{
                        "sign-in": "sign-in";
                        "email-verification": "email-verification";
                        "forget-password": "forget-password";
                    }>;
                }, $strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                otp: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                otp: null;
            } | {
                otp: string;
            }>;
            checkVerificationOTP: StrictEndpoint<"/email-otp/check-verification-otp", {
                method: "POST";
                body ...
import emailOTPClient
*/
import { emailOTPClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    basePath: "/api",
    baseURL: "http://localhost:8787",
    plugins: [
        checkEmailClient(),
        emailCooldownClient(),
        emailOTPClient()
    ],

})


/*
checkEmail 有TS錯誤
類型 '{ emailOtp: { sendVerificationOtp: <FetchOptions extends ClientFetchOption<Partial<{ email: string; type: "sign-in" | "email-verification" | "forget-password"; }> & Record<string, any>, Partial<Record<...>> & Record<...>, Record<...> | undefined>>(data_0: Prettify<...>, data_1?: FetchOptions | undefined) => Promise<...' 沒有屬性 'checkEmail'。ts(2339)
*/
authClient.checkEmail({ email: "test@holonspace.com" })

// 可以正確的推導ts
authClient.emailOtp.sendVerificationOtp({ email: "test@holonspace.com", type: "email-verification" })

