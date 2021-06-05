<?php

namespace ClarkWinkelmann\ShadowBan\Listener;

use Carbon\Carbon;
use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveUser
{
    public function handle(Saving $event)
    {
        $attributes = (array)Arr::get($event->data, 'attributes');

        if (Arr::exists($attributes, 'shadowBannedUntil')) {
            $event->actor->assertCan('shadowBan', $event->user);

            if ($attributes['shadowBannedUntil']) {
                $event->user->shadow_banned_until = Carbon::parse($attributes['shadowBannedUntil']);
            } else {
                $event->user->shadow_banned_until = null;
            }
        }
    }
}
