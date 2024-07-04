# Use Cases
- Merge multiple `commit` records of the current branch
- Combine multiple invalid `commit` records into one before submitting a PR to remove invalid commit information.

# Rebase Operations
First, check the commit log and select the version number of the commit that needs to be merged
Find the version number of a commit made before your own.
```shell
git log
```
Use the `git rebase -i` command to enter the following page, operate like vim, and press `i` to enter edit mode.
```shell
// ad1cff40 represents the commit record id, this id is usually the id of the commit right before the first one in our current modifications
git rebase -i ad1cff40
```
If the markers are incorrect, you can use the command to delete: `rm -fr ".git/rebase-merge"`

The editing interface will display something like:

```shell
pick 150b094 update: Update documentation
pick 9881e77 update: Optimize code
pick f3ec765 optimised: Optimize code
```
Keep the first `pick`, and change the rest to `s` and save.

Save and exit the editing page (press Esc and then type `:wq`) to enter the commit message page
After changing `pick` to `s`, you will normally get a prompt to modify the commit message interface. The information is displayed as follows:
```shell
update: Update documentation

# This is the commit message #2:

update: Optimize code

# This is the commit message #3:

optimised: Optimize code
```
Then, press `i` to enter the editing interface, modify your `commit message`, delete unnecessary `message`, and after handling, `wq` to save. You should then see an automatic message similar to:
```shell
Successfully rebased and updated refs/heads/feat/partition.
```
When you continue with `git log`, the record has changed.

Commit the code
Sync to the remote git repository
```shell
git push --force
```