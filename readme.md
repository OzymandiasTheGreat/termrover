# termrover

This is my first time working with Ink, a React renderer for CLI.
Despite known bugs in `ink-testing-library` this was a fun and quick little
project.

## CLI

```
$ termrover --help

	Display images from NASA's Perseverance's "Front Left Hazard Avoidance Camera"
	indexed chronologically.

	Usage
		$ termrover

	Options
		-i, --index      Display image at this index (Default: latest)
		-s, --slideshow  Display a slideshow of all images with a given delay in milliseconds

	Examples
		$ termrover --index=13
```
