# PR Contribution Process
[Open Source Guide](https://docs.github.com/zh/pull-requests)

## 1. Sync Fork from Upstream

[Github Documentation: syncing-a-fork](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)

To prevent conflicts caused by changes in the upstream repository, you should `sync fork` before making a `pr`, and resolve conflicts (try to resolve conflicts locally).

![image](https://github.com/smart-doc-group/smart-doc-group.github.io/assets/50514081/3541425d-19fe-4ab6-8a2a-d23057142ea9)

## 2. Sync from Remote Repository && Resolve Conflicts Locally
1. Use the `git pull` command locally to sync code from the remote repository

2. If there are no conflicts, that's great. If there are conflicts, [refer to about-merge-conflicts](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts) to resolve them.

## 3. Commit && Push to Remote Repository

1. A `pull request` can only contain one `commit`. If there are multiple `commits`, use the [Rebase command to merge commits](zh-cn/community/rebase-option.md)
2. Each `commit` should add corresponding modification records in the `CHANGELOG`.
3. Use `git push` or `git push -f`(add `-f` if merging remote `commits`) to push `commit` to the remote repository.

- [Reference document for Rebase operation](community/rebase-option.md)

## 4. Create Pull Request

1. **Create a pull request**

![image](https://github.com/smart-doc-group/smart-doc-group.github.io/assets/50514081/0be96dfd-6a78-495b-8618-49994f417f93)

2. **Fill in the title and comment carefully**. The `title` briefly describes your intention, and the `comment` provides a detailed description of the process. You can refer to closed `pr`s.

![image](../../_images/pr.png)

3. **Handle reviews**. If your `pull request` is perfect, it will be directly accepted by the community. If the community `review` finds issues, there will be comments, and we can discuss directly. After the issue is resolved, click `Resolve conversation`.

![1698071332712](https://github.com/smart-doc-group/smart-doc-group.github.io/assets/50514081/9625c152-0eeb-4dd9-91d0-1f38a053bc1a)

> Note: If multiple commits occur during the problem-solving period, we need to use the rebase command to merge commits!