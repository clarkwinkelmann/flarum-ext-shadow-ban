<?php

namespace ClarkWinkelmann\ShadowBan\Policy;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function shadowBan(User $actor, User $user)
    {
        return $actor->hasPermission('clarkwinkelmann-shadow-ban.ban');
    }
}
