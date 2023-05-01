Thank you Nader Dabit for the work here, which this project is following: https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291 Follow his work either at dev.to or here: https://github.com/dabit3

Since code and Solana has changed so much since then, I'm updating the web post code to work with current Anchor and changing tests to typescript. First order of business is to shake the spectre of Serum and move over to Coral (even if it's already dealt with using symlinks, branding matters to me).

$ yarn add @coral-xyz/anchor


Part 1 can be found at: program/mysolanaapp/src/lib.rs.part1

Similarly, the part 1 test will be: tests/mysolanaapp.ts.part1

I renamed them so the original steps could be tracked, because part 2 departs from the code in part 1 significantly.

**Front End**

skipping the front end part, but may come back.

**Hello World part 2**
Will update this as well, as the lib.rs file. No big changes, but updated lib.rs and tests.
