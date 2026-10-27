# Git and GitHub

The main repo is `PSTommyDesigner/nation-design-system` (private). Local git was set up on 2026-10-18 and first pushed to GitHub on 2026-10-19.

## Ask first
Creating a repo, changing its visibility, or force pushing: ask first, every time.

## Account
- The GitHub account is `PSTommyDesigner`. This repo sets its own local `user.name` and `user.email`, separate from the machine's global values (the global values belong to another account)
- Whenever you suspect a commit would be tied to the wrong account, check `git config user.name` and `git config user.email` first

## When `git push` fails with "Invalid username or token" (seen 2026-10-19)
On some machines the VS Code integrated terminal can't let `git` ask for a username and password at all. `git push` fails at once
with `remote: Invalid username or token` and never shows a prompt, even with `git -c credential.helper=` to turn helpers off,
and VS Code shows no separate dialog either. It was checked that this is not an old Keychain entry and not another credential helper.

What works: skip git's prompt and store the token in the Keychain directly with one command. Replace `YOUR_TOKEN_HERE` with the real token before pressing Enter:
```
printf 'protocol=https\nhost=github.com\nusername=<GitHub account>\npassword=YOUR_TOKEN_HERE\n\n' | git credential approve
```
After this one time, later pushes take the token from the Keychain without asking (`credential.helper` is already `osxkeychain`, both global and local).

MUST NOT pass a token through a file that is kept, or through chat. The user types or pastes it on their own command line only, the same rule as for `.env`.
