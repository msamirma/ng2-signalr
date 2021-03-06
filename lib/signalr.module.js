"use strict";
var core_1 = require('@angular/core');
var signalr_1 = require('./signalr');
var sr = require('signalr-no-jquery');
exports.SIGNALR_CONFIGURATION = new core_1.OpaqueToken('SIGNALR_CONFIGURATION');
function createSignalr(configuration, zone) {
    var jConnectionFn = getJConnectionFn();
    return new signalr_1.SignalR(configuration, zone, jConnectionFn);
}
exports.createSignalr = createSignalr;
function getJConnectionFn() {
    var hubConnectionFn = sr.hubConnection;
    if (hubConnectionFn == null)
        throw new Error('Signalr failed to initialize. Script \'jquery.signalR.js\' is missing. Please make sure to include \'jquery.signalR.js\' script.');
    return hubConnectionFn;
}
exports.getJConnectionFn = getJConnectionFn;
var SignalRModule = (function () {
    function SignalRModule() {
    }
    SignalRModule.forRoot = function (getSignalRConfiguration) {
        return {
            ngModule: SignalRModule,
            providers: [
                {
                    provide: exports.SIGNALR_CONFIGURATION,
                    useFactory: getSignalRConfiguration
                },
                {
                    provide: signalr_1.SignalR,
                    useFactory: (createSignalr),
                    deps: [exports.SIGNALR_CONFIGURATION, core_1.NgZone]
                }
            ],
        };
    };
    SignalRModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [{
                            provide: signalr_1.SignalR,
                            useValue: signalr_1.SignalR
                        }]
                },] },
    ];
    SignalRModule.ctorParameters = function () { return []; };
    return SignalRModule;
}());
exports.SignalRModule = SignalRModule;
//# sourceMappingURL=signalr.module.js.map