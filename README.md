# Project Name

Tempopup shows a popup based on scrollposition(todo) or time.
You might want use it when  you need to show certain element after x seconds the user is on the page, or when he reaches 100% scroll position.

## Installationdo

1. Include jQuery.
2. Include jquery.tempopup.js
3. Inlcude in your css '.popup--hidden { display: none}'
3. $(element).tempopup();

## Usage

| Parameter      | Type   | Default value | Description                                                                                                 |
|----------------|--------|---------------|-------------------------------------------------------------------------------------------------------------|
| activation     | string |      time     | This can be either 'scroll' or 'time', sets how the popup should be activated                               |
| scrollPosition |   int  | 100           | What position of the scroll the popup should show. default is 100, **only 100 or 0 are supported for now.** |
| timeActivation |   int  | 0             | After how many ms should the popup be shown?                                                                |
| cookieName     | string | tempopupShown | Name of the cookie                                                                                          |
| cookieDuration |   int  | 1             | Duration in days of the cookie                                                                              |
| closeClassCss  | string | popup-close   | Class that triggers the close                                                                               |
| hideClass      | string |               | Class that is applied on the div to hide it                                                                 |                                                         |

## Contributing

Found a bug? Found an issue? open a ticket!

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits

@danielhq

## License

TODO: Write license