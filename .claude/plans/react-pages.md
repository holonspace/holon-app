```ts
import routers from "~react-pages"
```

routers為下面的json(動態生成)

```json
[
  {
    "caseSensitive": false,
    "path": "chat",
    "element": {
      "type": {
        "_payload": {
          "_status": -1,
          "_ioInfo": {
            "name": "lazy",
            "start": -1,
            "end": -1,
            "value": null,
            "owner": null,
            "debugStack": {},
            "debugTask": {}
          }
        },
        "_debugInfo": [
          {
            "awaited": {
              "name": "lazy",
              "start": -1,
              "end": -1,
              "value": null,
              "owner": null,
              "debugStack": {},
              "debugTask": {}
            }
          }
        ]
      },
      "key": null,
      "props": {},
      "_owner": null,
      "_store": {}
    },
    "moduleName": "chat"
  },
  {
    "caseSensitive": false,
    "path": "onboarding",
    "element": {
      "type": {
        "_payload": {
          "_status": -1,
          "_ioInfo": {
            "name": "lazy",
            "start": -1,
            "end": -1,
            "value": null,
            "owner": null,
            "debugStack": {},
            "debugTask": {}
          }
        },
        "_debugInfo": [
          {
            "awaited": {
              "name": "lazy",
              "start": -1,
              "end": -1,
              "value": null,
              "owner": null,
              "debugStack": {},
              "debugTask": {}
            }
          }
        ]
      },
      "key": null,
      "props": {},
      "_owner": null,
      "_store": {}
    },
    "moduleName": "onboarding"
  },
  {
    "caseSensitive": false,
    "path": "/",
    "children": [
      {
        "caseSensitive": false,
        "path": "otp",
        "element": {
          "type": {
            "_payload": {
              "_status": -1,
              "_ioInfo": {
                "name": "lazy",
                "start": -1,
                "end": -1,
                "value": null,
                "owner": null,
                "debugStack": {},
                "debugTask": {}
              }
            },
            "_debugInfo": [
              {
                "awaited": {
                  "name": "lazy",
                  "start": -1,
                  "end": -1,
                  "value": null,
                  "owner": null,
                  "debugStack": {},
                  "debugTask": {}
                }
              }
            ]
          },
          "key": null,
          "props": {},
          "_owner": null,
          "_store": {}
        },
        "moduleName": "(auth)"
      },
      {
        "caseSensitive": false,
        "path": "signin",
        "element": {
          "type": {
            "_payload": {
              "_status": -1,
              "_ioInfo": {
                "name": "lazy",
                "start": -1,
                "end": -1,
                "value": null,
                "owner": null,
                "debugStack": {},
                "debugTask": {}
              }
            },
            "_debugInfo": [
              {
                "awaited": {
                  "name": "lazy",
                  "start": -1,
                  "end": -1,
                  "value": null,
                  "owner": null,
                  "debugStack": {},
                  "debugTask": {}
                }
              }
            ]
          },
          "key": null,
          "props": {},
          "_owner": null,
          "_store": {}
        },
        "moduleName": "(auth)"
      }
    ]
  },
  {
    "caseSensitive": false,
    "path": "dashboard",
    "children": [
      {
        "caseSensitive": false,
        "path": "agents",
        "element": {
          "type": {
            "_payload": {
              "_status": -1,
              "_ioInfo": {
                "name": "lazy",
                "start": -1,
                "end": -1,
                "value": null,
                "owner": null,
                "debugStack": {},
                "debugTask": {}
              }
            },
            "_debugInfo": [
              {
                "awaited": {
                  "name": "lazy",
                  "start": -1,
                  "end": -1,
                  "value": null,
                  "owner": null,
                  "debugStack": {},
                  "debugTask": {}
                }
              }
            ]
          },
          "key": null,
          "props": {},
          "_owner": null,
          "_store": {}
        },
        "moduleName": "dashboard"
      },
      {
        "caseSensitive": false,
        "path": "",
        "element": {
          "type": {
            "_payload": {
              "_status": -1,
              "_ioInfo": {
                "name": "lazy",
                "start": -1,
                "end": -1,
                "value": null,
                "owner": null,
                "debugStack": {},
                "debugTask": {}
              }
            },
            "_debugInfo": [
              {
                "awaited": {
                  "name": "lazy",
                  "start": -1,
                  "end": -1,
                  "value": null,
                  "owner": null,
                  "debugStack": {},
                  "debugTask": {}
                }
              }
            ]
          },
          "key": null,
          "props": {},
          "_owner": null,
          "_store": {}
        },
        "moduleName": "dashboard"
      },
      {
        "caseSensitive": false,
        "path": "_layout",
        "element": {
          "type": {
            "_payload": {
              "_status": -1,
              "_ioInfo": {
                "name": "lazy",
                "start": -1,
                "end": -1,
                "value": null,
                "owner": null,
                "debugStack": {},
                "debugTask": {}
              }
            },
            "_debugInfo": [
              {
                "awaited": {
                  "name": "lazy",
                  "start": -1,
                  "end": -1,
                  "value": null,
                  "owner": null,
                  "debugStack": {},
                  "debugTask": {}
                }
              }
            ]
          },
          "key": null,
          "props": {},
          "_owner": null,
          "_store": {}
        },
        "meta": "layout",
        "moduleName": "dashboard"
      }
    ]
  }
]
```

我需要將上面json格式生成對於的React

```tsx
<Route path="/(signin|otp)">
  <Route path="/signin">
    <Suspense fallback={<DefaultLoading />}>{element}</Suspense>
  </Route>
  <Route path="/otp">
    <Suspense fallback={<DefaultLoading />}>{element}</Suspense>
  </Route>
</Route>
<Route path="/onboarding">
  <Suspense fallback={<DefaultLoading />}>{element}</Suspense>
</Route>
<Route path="/dashboard">
  <Route path="/agents">
    <Suspense fallback={<DefaultLoading />}>{element}</Suspense>
  </Route>
  <Route path="/">
    <Suspense fallback={<DefaultLoading />}>{element}</Suspense>
  </Route>
</Route>
```
