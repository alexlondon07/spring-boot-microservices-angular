"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommandModuleToYargs = exports.demandCommandFailureMessage = void 0;
exports.demandCommandFailureMessage = `You need to specify a command before moving on. Use '--help' to view the available commands.`;
function addCommandModuleToYargs(localYargs, commandModule, context) {
    const cmd = new commandModule(context);
    const describe = context.args.options.jsonHelp ? cmd.fullDescribe : cmd.describe;
    return localYargs.command({
        command: cmd.command,
        aliases: cmd.aliases,
        describe: 
        // We cannot add custom fields in help, such as long command description which is used in AIO.
        // Therefore, we get around this by adding a complex object as a string which we later parse when generating the help files.
        typeof describe === 'object' ? JSON.stringify(describe) : describe,
        deprecated: cmd.deprecated,
        builder: (argv) => cmd.builder(argv),
        handler: (args) => cmd.handler(args),
    });
}
exports.addCommandModuleToYargs = addCommandModuleToYargs;
