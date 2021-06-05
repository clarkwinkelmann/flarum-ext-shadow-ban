<?php

namespace ClarkWinkelmann\ShadowBan\Policy;

use Flarum\Post\Post;
use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class PostPolicy extends AbstractPolicy
{
    public function shadowHide(User $actor, Post $post)
    {
        return $actor->hasPermission('clarkwinkelmann-shadow-ban.hide');
    }
}
