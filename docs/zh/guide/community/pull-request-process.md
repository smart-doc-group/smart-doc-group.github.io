# PR贡献流程
[开源指南](https://docs.github.com/zh/pull-requests)

## 1. 从上游仓库同步（sync fork）

[Github 文档：syncing-a-fork](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) 

为了防止上游仓库的更改导致冲突，在`pr`之前要先`sync frok`, 解决冲突（尽量将冲突在本地解决）。

![sync-fork](/assets/sync-fork.png)


## 2. 从远程仓库同步 && 本地解决冲突
1. 在本地使用`git pull`命令从远程仓库同步代码

2. 如果没有冲突，那太好了。如果存在冲突，请参考 [about-merge-conflicts](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts) 解决

## 3. 提交commit && 推送到远程仓库

:::warning 代码格式化
提交commit之前请使用 `mvn spring-javaformat:apply`进行代码格式化
:::

1. 一个 `pull request` 中只能一个 `commit` 。如果有多个 `commit` ，使用 [Rebase命令合并commit](rebase-option)
2. 每个`commit`都要在`CHANGELOG`中添加对应的修改记录。
3. 确保 `commit` 提交信息符合 [Angular 提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)。
4. `git push` 或则 `git push -f` (合并了远程 `commit` 添加 `-f` ) 推送`commit`到远程仓库

- [Rebase操作参考文档](rebase-option)

::: tip
- [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)
- [Angular 提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
:::


## 4. 创建 pull request

1. **创建 pull request**

![image](/assets/create-full-pequest.png)

2. **认真填写title和comment**。`title`简单描述你的意图，`comment`中详细描述过程。可以参考已关闭的`pr`)。

![image](/assets/pr.png)

3. **处理review**。如果你的`pull request`很完美，会直接被社区采纳。如果社区`review`发现问题，会有评论，我们可以直接讨论，最后解决问题了，要点击 `Resolve conversation`。

![handle-reviews](/assets/handle-reviews.png)

> 注意：如果解决问题期间出现了多个commit，我们要使用rebase命令合并commit!