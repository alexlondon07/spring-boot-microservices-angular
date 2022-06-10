#!/usr/bin/env node

      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
      const __ESM_IMPORT_META_URL__ = import.meta.url;
    
import {
  parseCommandLineOptions
} from "../chunk-U2VFXNL7.js";
import {
  mainNgcc
} from "../chunk-EI6PFDB4.js";
import "../chunk-HMWNYAAE.js";
import "../chunk-AXU2Z2WN.js";
import "../chunk-RT3OZMJ6.js";
import "../chunk-NTRR4N4C.js";
import "../chunk-ZJCM37WF.js";
import "../chunk-7J66ZDC5.js";
import "../chunk-BFPVXDJN.js";
import "../chunk-SFACRVMZ.js";
import "../chunk-MURZUYM7.js";
import "../chunk-QK4SXRQA.js";
import "../chunk-GMSUYBZP.js";

// bazel-out/darwin_arm64-fastbuild/bin/packages/compiler-cli/ngcc/main-ngcc.mjs
process.title = "ngcc";
var startTime = Date.now();
var options = parseCommandLineOptions(process.argv.slice(2));
(async () => {
  try {
    await mainNgcc(options);
    if (options.logger) {
      const duration = Math.round((Date.now() - startTime) / 1e3);
      options.logger.debug(`Run ngcc in ${duration}s.`);
    }
    process.exitCode = 0;
  } catch (e) {
    console.error(e.stack || e.message);
    process.exit(typeof e.code === "number" ? e.code : 1);
  }
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//# sourceMappingURL=main-ngcc.js.map
