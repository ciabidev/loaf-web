<script lang="ts">
    import type { Emotion } from '../../types/emoticon.js';
    import angry from '../../assets/emotions/angry.png';
    import awkward from '../../assets/emotions/awkward.png';
    import confused from '../../assets/emotions/confused.png';
    import happy from '../../assets/emotions/happy.png';
    import sad from '../../assets/emotions/sad.png';
    import surprised from '../../assets/emotions/surprised.png';
    import unamused from '../../assets/emotions/unamused.png';

    type Props = {
        emotion: Emotion;
        size?: "small" | "medium" | "large";
    }

    const { emotion, size = "medium" }: Props = $props();

    const emotionSources: Record<Emotion, string> = {
        angry,
        awkward,
        confused,
        happy,
        sad,
        surprised,
        unamused
    };

    let loaded = $state(false)
</script>

<img
    class="emotion {emotion}"
    src={emotionSources[emotion]}
    onload={() => loaded = true}
    alt={emotion}
    aria-hidden="true"
    class:small={size === "small"}
    class:medium={size === "medium"}
    class:large={size === "large"}
/>

<style>
    .emotion {
        width: 1em;
        height: 1em;
        border-radius: var(--loaf-radius-md);
    }

    .emotion.small {
        width: 8rem;
        height: 8rem;
    }

    .emotion.medium {
        width: 12rem;
        height: 12rem;
    }

    .emotion.large {
        width: 16rem;
        height: 16rem;
    }
</style>
