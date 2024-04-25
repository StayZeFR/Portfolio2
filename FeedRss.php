<?php

function read(array $feeds, int $limit = 5): array
{
    $items = [];
    foreach ($feeds as $feed) {
        $items[] = readFeed($feed, $limit);
    }
    return $items;
}

function readFeed(string $feed, int $limit): array
{
    $rss = simplexml_load_file($feed);
    $items = [
        "title" => (string) $rss->channel->title,
    ];
    for ($i = 0; $i < $limit; $i++) {
        if (isset($rss->channel->item[$i])) {
            $items["items"][] = [
                "title" => (string) $rss->channel->item[$i]->title,
                "link" => (string) $rss->channel->item[$i]->link,
                "description" => (string) $rss->channel->item[$i]->description,
                "date" => (string) $rss->channel->item[$i]->pubDate,
            ];
        }
    }
    return $items;
}

if (isset($_POST["url"])) {
    $url = json_decode($_POST["url"]);
    $feeds = read($url);
    echo json_encode($feeds);
}