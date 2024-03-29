---
title: Wallpaper
layout: post
---

I'm _particular_ about my desktop wallpaper. 🤦🏻‍♂️ It can't be too bright or
distracting; I want to focus on my work. But it can't be too dull or boring; I
also want to feel inspired.

The approach taken by the folks [designing the Raycast wallpapers][raycast]
caught my attention, so I tried it! Beyond what they had done, I wanted to use
the colors from [Solarized][solarized] and to support both light and dark
modes.

[raycast]: https://www.raycast.com/blog/making-a-raycast-wallpaper
[solarized]: https://ethanschoonover.com/solarized/

I'm inordinately pleased with these results. You can click either image here to
download a macOS dynamic desktop image that will switch between them based on
your system preferences.

<a href="/images/2023/05/04/solarized.heic"><img src="/images/2023/05/04/light.png" width="512" height="288" /></a>

<a href="/images/2023/05/04/solarized.heic"><img src="/images/2023/05/04/dark.png" width="512" height="288" /></a>

## Make your own

Better yet, here's [the Swift script][script] I used, thanks to a bunch of
tricks from the internet. You can tweak the gradient stops and run this from
the command line (no need to launch Xcode) to play around and make something
that works for you.

[script]: https://github.com/matthewtodd/dotfiles/blob/ffe4af5f52ed9820a98e7977473664d708f157e7/libexec/dynamic_desktop.swift

Have fun!

```swift
#!/usr/bin/swift

import AVFoundation
import SwiftUI

// https://nshipster.com/macos-dynamic-desktop/
// https://harshil.net/blog/dynamic-wallpapers-in-macos-catalina
struct DynamicDesktop {
    let light: CGImage
    let dark: CGImage

    init(light: CGImage, dark: CGImage) {
        self.light = light
        self.dark = dark
    }

    func write(to url: URL) {
        let encoder = PropertyListEncoder()
        encoder.outputFormat = .binary

        let tag = CGImageMetadataTagCreate(
            "http://ns.apple.com/namespace/1.0/" as CFString,
            "apple_desktop" as CFString,
            "apr" as CFString,
            .string,
            try! encoder.encode(["l": 0, "d": 1]).base64EncodedString() as CFString
        )!

        let metadata = CGImageMetadataCreateMutable()
        CGImageMetadataSetTagWithPath(metadata, nil, "xmp:apr" as CFString, tag)

        let destination = CGImageDestinationCreateWithURL(url as CFURL, AVFileType.heic as CFString, 2, nil)!
        CGImageDestinationAddImageAndMetadata(destination, light, metadata, nil)
        CGImageDestinationAddImage(destination, dark, nil)
        CGImageDestinationFinalize(destination)
    }
}

// We want to draw angular gradients, which only SwiftUI has. (CoreGraphics can
// only do linear and radial ones.) So we use this trick to turn a SwiftUI View
// into an image: https://stackoverflow.com/a/76083393
func render<Content>(_ content: Content) async -> CGImage where Content: View  {
    return await MainActor.run {
        return ImageRenderer(content: content).cgImage!
    }
}

// https://www.raycast.com/blog/making-a-raycast-wallpaper
func raycast(_ stops: Gradient.Stop...) -> any View {
    return Rectangle()
        .fill(.conicGradient(stops: stops, center: UnitPoint(x: 0.5, y: 0.75)))
        .frame(width: 5120, height: 2880)
        .blur(radius: 800, opaque: true)
}

// https://ethanschoonover.com/solarized/#the-values
enum Solarized: Int {
    case base03  = 0x002b36
    case base02  = 0x073642
    case base01  = 0x586e75
    case base00  = 0x657b83
    case base0   = 0x839496
    case base1   = 0x93a1a1
    case base2   = 0xeee8d5
    case base3   = 0xfdf6e3
    case yellow  = 0xb58900
    case orange  = 0xcb4b16
    case red     = 0xdc322f
    case magenta = 0xd33682
    case violet  = 0x6c71c4
    case blue    = 0x268bd2
    case cyan    = 0x2aa198
    case green   = 0x859900

    var color: Color {
        Color(red: component(16), green: component(8), blue: component(0))
    }

    private func component(_ shift: Int) -> CGFloat {
        CGFloat((self.rawValue >> shift) & 0xff) / 0xff
    }
}

let desktop = DynamicDesktop(
    light: await render(raycast(
        Gradient.Stop(color: Solarized.base1.color, location: 0),
        Gradient.Stop(color: Solarized.base3.color, location: 0.75),
        Gradient.Stop(color: Solarized.green.color, location: 0.8),
        Gradient.Stop(color: Solarized.base1.color, location: 0.85)
    )),
    dark: await render(raycast(
        Gradient.Stop(color: Solarized.base03.color, location: 0),
        Gradient.Stop(color: Solarized.base01.color, location: 0.75),
        Gradient.Stop(color: Solarized.green.color, location: 0.8),
        Gradient.Stop(color: Solarized.base03.color, location: 0.85)
    ))
)

desktop.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
```
