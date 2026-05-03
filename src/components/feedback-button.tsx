import { useState } from "react";
import { Flag, Loader2, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "@/components/location-provider";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const schema = z.object({
  message: z.string().trim().min(5, "Please describe the issue (at least 5 characters)").max(2000),
  contact: z.string().trim().max(200).optional().or(z.literal("")),
});

type Geo = { latitude: number; longitude: number; accuracy: number } | null;

export function FeedbackButton() {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [geo, setGeo] = useState<Geo>(null);
  const [geoErr, setGeoErr] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function captureLocation() {
    if (!("geolocation" in navigator)) {
      setGeoErr("Geolocation is not supported by this browser.");
      return;
    }
    setGeoLoading(true);
    setGeoErr(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setGeoLoading(false);
      },
      (err) => {
        setGeoErr(err.message || "Unable to get your location.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  async function submit() {
    const parsed = schema.safeParse({ message, contact });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("date_feedback").insert({
      state_code: state?.code ?? null,
      state_name: state?.name ?? null,
      message: parsed.data.message,
      contact: parsed.data.contact || null,
      latitude: geo?.latitude ?? null,
      longitude: geo?.longitude ?? null,
      accuracy: geo?.accuracy ?? null,
      geo_error: geoErr,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't submit feedback. Please try again.");
      return;
    }
    toast.success("Thanks! Your report has been received.");
    setOpen(false);
    setMessage("");
    setContact("");
    setGeo(null);
    setGeoErr(null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition"
          aria-label="Report incorrect dates"
        >
          <Flag className="w-4 h-4" />
          <span className="hidden sm:inline">Report incorrect dates</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report incorrect election dates</DialogTitle>
          <DialogDescription>
            Help us keep the timeline accurate. Tell us what's wrong for{" "}
            <span className="font-medium text-foreground">
              {state?.name ?? "your state"}
            </span>{" "}
            and we'll review it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fb-msg">What's incorrect?</Label>
            <Textarea
              id="fb-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Polling in West Bengal is on April 23, not April 19. Source: eci.gov.in/…"
              rows={4}
              maxLength={2000}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="fb-contact">Contact (optional)</Label>
            <Input
              id="fb-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="email or phone, if you'd like a reply"
              maxLength={200}
              className="mt-1.5"
            />
          </div>

          <div className="rounded-xl border border-border bg-card/40 p-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-medium">Device location</p>
                {geo ? (
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                    {geo.latitude.toFixed(5)}, {geo.longitude.toFixed(5)} (±{Math.round(geo.accuracy)}m)
                  </p>
                ) : geoErr ? (
                  <p className="text-xs text-destructive mt-0.5">{geoErr}</p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Optional — share to help us verify your region.
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Selected state:{" "}
                  <span className="font-medium text-foreground">
                    {state?.name ? `${state.name} (${state.code})` : "none"}
                  </span>
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={captureLocation}
                disabled={geoLoading}
              >
                {geoLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : geo ? "Refresh" : "Share location"}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={submitting || !message.trim()}>
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
