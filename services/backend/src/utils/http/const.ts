import type { ObjectValues } from "@packages/devx";


export type Methods = ObjectValues<typeof Methods>;
export const Methods = {
  GET: "GET",
  HEAD: "HEAD",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  CONNECT: "CONNECT",
  OPTIONS: "OPTIONS",
  TRACE: "TRACE",
  PATCH: "PATCH"
} as const;

export type InformationalStatusCodes = ObjectValues<typeof InformationalStatusCodes>;
export const InformationalStatusCodes = {
  /**
   * This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.2.1
   */
  CONTINUE: 100,

  /**
   * This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.2.2
   */
  SWITCHING_PROTOCOLS: 101,

  /**
   * This code indicates that the server has received and is processing the request, but no response is available yet.
   * @doc https://tools.ietf.org/html/rfc2518#section-10.1
   */
  PROCESSING: 102,

  /**
   * This code indicates to the client that the server is likely to send a final response with the header fields included in the informational response.
   * @doc https://www.rfc-editor.org/rfc/rfc8297#page-3
   */
  EARLY_HINTS: 103
} as const;

export type SuccessfulStatusCode = ObjectValues<typeof SuccessfulStatusCode>;
export const SuccessfulStatusCode = {
  /**
   * The request has succeeded. The meaning of a success varies depending on the HTTP method:
   * GET: The resource has been fetched and is transmitted in the message body.
   * HEAD: The entity headers are in the message body.
   * POST: The resource describing the result of the action is transmitted in the message body.
   * TRACE: The message body contains the request message as received by the server
   * @doc https://tools.ietf.org/html/rfc7231#section-6.3.1
   */
  OK: 200,

  /**
   * The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.3.2
   */
  CREATED: 201,

  /**
   * The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.3.3
   */
  ACCEPTED: 202,

  /**
   * This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.3.4
   */
  NON_AUTHORITATIVE_INFORMATION: 203,

  /**
   * There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.3.5
   */
  NO_CONTENT: 204,

  /**
   * This response code is sent after accomplishing request to tell user agent reset document view which sent this request.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.3.6
   */
  RESET_CONTENT: 205,

  /**
   * This response code is used because of range header sent by the client to separate download into multiple streams.
   * @doc https://tools.ietf.org/html/rfc7233#section-4.1
   */
  PARTIAL_CONTENT: 206,

  /**
   * A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.
   * @doc https://tools.ietf.org/html/rfc2518#section-10.2
   */
  MULTI_STATUS: 207
} as const;

export type RedirectionStatusCodes = ObjectValues<typeof RedirectionStatusCodes>;
export const RedirectionStatusCodes = {
  /**
   * The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.4.1
   */
  MULTIPLE_CHOICES: 300,

  /**
   * This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.4.2
   */
  MOVED_PERMANENTLY: 301,

  /**
   * This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.4.3
   */
  MOVED_TEMPORARILY: 302,

  /**
   * Server sent this response to directing client to get requested resource to another URI with an GET request.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.4.4
   */
  SEE_OTHER: 303,

  /**
   * This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.
   * @doc https://tools.ietf.org/html/rfc7232#section-4.1
   */
  NOT_MODIFIED: 304,

  /**
   * Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.4.7
   */
  TEMPORARY_REDIRECT: 307,

  /**
   * This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
   * @doc https://tools.ietf.org/html/rfc7538#section-3
   */
  PERMANENT_REDIRECT: 308
} as const;

export type ClientErrorStatusCodes = ObjectValues<typeof ClientErrorStatusCodes>;
export const ClientErrorStatusCodes = {
  /**
   * This response means that server could not understand the request due to invalid syntax.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.1
   */
  BAD_REQUEST: 400,

  /**
   * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
   * @doc https://tools.ietf.org/html/rfc7235#section-3.1
   */
  UNAUTHORIZED: 401,

  /**
   * This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.2
   */
  PAYMENT_REQUIRED: 402,

  /**
   * The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.3
   */
  FORBIDDEN: 403,

  /**
   * The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.4
   */
  NOT_FOUND: 404,

  /**
   * The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.5
   */
  METHOD_NOT_ALLOWED: 405,

  /**
   * This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.6
   */
  NOT_ACCEPTABLE: 406,

  /**
   * This is similar to 401 but authentication is needed to be done by a proxy.
   * @doc https://tools.ietf.org/html/rfc7235#section-3.2
   */
  PROXY_AUTHENTICATION_REQUIRED: 407,

  /**
   * This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.7
   */
  REQUEST_TIMEOUT: 408,

  /**
   * This response is sent when a request conflicts with the current state of the server.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.8
   */
  CONFLICT: 409,

  /**
   * This response would be sent when the requested content has been permenantly deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.9
   */
  GONE: 410,

  /**
   * The server rejected the request because the Content-Length header field is not defined and the server requires it.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.10
   */
  LENGTH_REQUIRED: 411,

  /**
   * The client has indicated preconditions in its headers which the server does not meet.
   * @doc https://tools.ietf.org/html/rfc7232#section-4.2
   */
  PRECONDITION_FAILED: 412,

  /**
   * Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.11
   */
  REQUEST_TOO_LONG: 413,

  /**
   * The URI requested by the client is longer than the server is willing to interpret.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.12
   */
  REQUEST_URI_TOO_LONG: 414,

  /**
   * The media format of the requested data is not supported by the server, so the server is rejecting the request.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.13
   */
  UNSUPPORTED_MEDIA_TYPE: 415,

  /**
   * The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.
   * @doc https://tools.ietf.org/html/rfc7233#section-4.4
   */
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,

  /**
   * This response code means the expectation indicated by the Expect request header field can't be met by the server.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.5.14
   */
  EXPECTATION_FAILED: 417,

  /**
   * Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.
   * @doc https://tools.ietf.org/html/rfc2324#section-2.3.2
   */
  IM_A_TEAPOT: 418,

  /**
   * The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.
   * @doc https://tools.ietf.org/html/rfc2518#section-10.6
   */
  INSUFFICIENT_SPACE_ON_RESOURCE: 419,

  /**
   * Defined in the specification of HTTP/2 to indicate that a server is not able to produce a response for the combination of scheme and authority that are included in the request URI.
   * @doc https://datatracker.ietf.org/doc/html/rfc7540#section-9.1.2
   */
  MISDIRECTED_REQUEST: 421,

  /**
   * The request was well-formed but was unable to be followed due to semantic errors.
   * @doc https://tools.ietf.org/html/rfc2518#section-10.3
   */
  UNPROCESSABLE_ENTITY: 422,

  /**
   * The resource that is being accessed is locked.
   * @doc https://tools.ietf.org/html/rfc2518#section-10.4
   */
  LOCKED: 423,

  /**
   * The request failed due to failure of a previous request.
   * @doc https://tools.ietf.org/html/rfc2518#section-10.5
   */
  FAILED_DEPENDENCY: 424,

  /**
   * The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
   * @doc https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.15
   */
  UPGRADE_REQUIRED: 426,

  /**
   * The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.
   * @doc https://tools.ietf.org/html/rfc6585#section-3
   */
  PRECONDITION_REQUIRED: 428,

  /**
   * The user has sent too many requests in a given amount of time ("rate limiting").
   * @doc https://tools.ietf.org/html/rfc6585#section-4
   */
  TOO_MANY_REQUESTS: 429,

  /**
   * The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.
   * @doc https://tools.ietf.org/html/rfc6585#section-5
   */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,

  /**
   * The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.
   * @doc https://tools.ietf.org/html/rfc7725
   */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451
} as const;

export type ServerErrorStatusCodes = ObjectValues<typeof ServerErrorStatusCodes>;
export const ServerErrorStatusCodes = {
  /**
   * The server encountered an unexpected condition that prevented it from fulfilling the request.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.6.1
   */
  INTERNAL_SERVER_ERROR: 500,

  /**
   * The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.6.2
   */
  NOT_IMPLEMENTED: 501,

  /**
   * This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.6.3
   */
  BAD_GATEWAY: 502,

  /**
   * The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.6.4
   */
  SERVICE_UNAVAILABLE: 503,

  /**
   * This error response is given when the server is acting as a gateway and cannot get a response in time.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.6.5
   */
  GATEWAY_TIMEOUT: 504,

  /**
   * The HTTP version used in the request is not supported by the server.
   * @doc https://tools.ietf.org/html/rfc7231#section-6.6.6
   */
  HTTP_VERSION_NOT_SUPPORTED: 505,

  /**
   * The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
   * @doc https://tools.ietf.org/html/rfc2518#section-10.6
   */
  INSUFFICIENT_STORAGE: 507,

  /**
   * The 511 status code indicates that the client needs to authenticate to gain network access.
   * @doc https://tools.ietf.org/html/rfc6585#section-6
   */
  NETWORK_AUTHENTICATION_REQUIRED: 511
} as const;

export type StatusCodes = ObjectValues<typeof StatusCodes>;
export const StatusCodes = {
  ...ServerErrorStatusCodes,
  ...ClientErrorStatusCodes,
  ...RedirectionStatusCodes,
  ...SuccessfulStatusCode,
  ...InformationalStatusCodes
} as const;